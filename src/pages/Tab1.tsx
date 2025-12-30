import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonAlert,
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToggle,
  IonToast
} from '@ionic/react';
import { useState, useEffect } from 'react';
import RepositoryItem from '../components/RepositoryItem';
import { getRepositories, Repository, deleteRepository, updateRepository, UpdateRepositoryData } from '../services/githubService';
import { useRepository } from '../context/RepositoryContext';
import './Tab1.css';

const Tab1: React.FC = () => {
  const { repositories, setRepositories, shouldRefresh, resetRefresh } = useRepository();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<Repository | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrivate, setEditPrivate] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await getRepositories();
      setRepositories(repos);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los repositorios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchRepositories();
      resetRefresh();
    }
  }, [shouldRefresh, resetRefresh]);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await fetchRepositories();
    event.detail.complete();
  };

  const handleDelete = (repo: Repository) => {
    setRepoToDelete(repo);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!repoToDelete) return;
    try {
      await deleteRepository(repoToDelete.owner.login, repoToDelete.name);
      setToastMessage(`Repositorio "${repoToDelete.name}" eliminado exitosamente`);
      setToastColor('success');
      setShowToast(true);
      await fetchRepositories();
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Error al eliminar el repositorio');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setShowDeleteAlert(false);
      setRepoToDelete(null);
    }
  };

  const handleEdit = (repo: Repository) => {
    setEditingRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || '');
    setEditPrivate(repo.private);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRepo) return;

    try {
      setEditLoading(true);
      const updateData: UpdateRepositoryData = {};
      if (editName !== editingRepo.name) updateData.name = editName;
      if (editDescription !== (editingRepo.description || '')) updateData.description = editDescription;
      if (editPrivate !== editingRepo.private) updateData.private = editPrivate;

      if (Object.keys(updateData).length > 0) {
        await updateRepository(editingRepo.owner.login, editingRepo.name, updateData);
        setToastMessage('Repositorio actualizado exitosamente');
        setToastColor('success');
        await fetchRepositories();
      }
      setShowEditModal(false);
      setEditingRepo(null);
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Error al actualizar el repositorio');
      setToastColor('danger');
    } finally {
      setEditLoading(false);
    }
    setShowToast(true);
  };

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchText.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Buscar repositorios"
            animated={true}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
          </div>
        )}

        {error && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          </div>
        )}

        {!loading && !error && (
          <IonList>
            {filteredRepositories.map((repo) => (
              <RepositoryItem
                key={repo.id}
                repository={repo}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={'Confirmar eliminación'}
          message={`¿Estás seguro de que quieres eliminar el repositorio "${repoToDelete?.name}"? Esta acción no se puede deshacer.`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowDeleteAlert(false)
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: confirmDelete
            }
          ]}
        />

        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Repositorio</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowEditModal(false)}>
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form onSubmit={handleEditSubmit}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre del repositorio</IonLabel>
                  <IonInput
                    value={editName}
                    onIonInput={(e) => setEditName(e.detail.value!)}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonTextarea
                    value={editDescription}
                    onIonInput={(e) => setEditDescription(e.detail.value!)}
                    rows={3}
                    autoGrow
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Repositorio privado</IonLabel>
                  <IonToggle
                    checked={editPrivate}
                    onIonChange={(e) => setEditPrivate(e.detail.checked)}
                  />
                </IonItem>
              </IonList>
              <div style={{ padding: '16px' }}>
                <IonButton expand="block" type="submit" disabled={editLoading}>
                  {editLoading ? <IonSpinner name="crescent" /> : 'Actualizar Repositorio'}
                </IonButton>
              </div>
            </form>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
