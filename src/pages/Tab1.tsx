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
  IonText
} from '@ionic/react';
import { useState, useEffect } from 'react';
import RepositoryItem from '../components/RepositoryItem';
import { getRepositories, Repository } from '../services/githubService';
import { useRepository } from '../context/RepositoryContext';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { shouldRefresh, resetRefresh } = useRepository();

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
                name={repo.name}
                description={repo.description || undefined}
                stars={repo.stargazers_count}
                language={repo.language || undefined}
                isPrivate={repo.private}
                updatedAt={repo.updated_at}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
