import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonToast,
  IonSpinner
} from '@ionic/react';
import { useState } from 'react';
import { gitBranch, checkmarkCircle } from 'ionicons/icons';
import { createRepository, CreateRepositoryData } from '../services/githubService';
import { useRepository } from '../context/RepositoryContext';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [autoInit, setAutoInit] = useState(true);
  const [gitignoreTemplate, setGitignoreTemplate] = useState('');
  const [license, setLicense] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useRepository();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoName.trim()) {
      setToastMessage('Por favor ingresa un nombre para el repositorio');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);

      const repoData: CreateRepositoryData = {
        name: repoName.trim(),
        private: isPrivate,
        auto_init: autoInit
      };

      if (description.trim()) {
        repoData.description = description.trim();
      }

      if (gitignoreTemplate) {
        repoData.gitignore_template = gitignoreTemplate;
      }

      if (license) {
        repoData.license_template = license;
      }

      await createRepository(repoData);

      setToastMessage(`Repositorio "${repoName}" creado exitosamente!`);
      setToastColor('success');
      setShowToast(true);
      triggerRefresh();


      setRepoName('');
      setDescription('');
      setIsPrivate(false);
      setAutoInit(true);
      setGitignoreTemplate('');
      setLicense('');
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || 'Error al crear el repositorio');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRepoName('');
    setDescription('');
    setIsPrivate(false);
    setAutoInit(true);
    setGitignoreTemplate('');
    setLicense('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">
                Nombre del repositorio <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
              </IonLabel>
              <IonInput
                value={repoName}
                onIonInput={(e) => setRepoName(e.detail.value!)}
                placeholder="mi-nuevo-repositorio"
                required
                clearInput
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Descripción (opcional)</IonLabel>
              <IonTextarea
                value={description}
                onIonInput={(e) => setDescription(e.detail.value!)}
                placeholder="Una breve descripción de tu repositorio"
                rows={3}
                autoGrow
              />
            </IonItem>

            <IonItem>
              <IonLabel>Repositorio privado</IonLabel>
              <IonToggle
                checked={isPrivate}
                onIonChange={(e) => setIsPrivate(e.detail.checked)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Inicializar con README</IonLabel>
              <IonToggle
                checked={autoInit}
                onIonChange={(e) => setAutoInit(e.detail.checked)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Plantilla .gitignore</IonLabel>
              <IonSelect
                value={gitignoreTemplate}
                onIonChange={(e) => setGitignoreTemplate(e.detail.value)}
                placeholder="Ninguna"
              >
                <IonSelectOption value="">Ninguna</IonSelectOption>
                <IonSelectOption value="Node">Node</IonSelectOption>
                <IonSelectOption value="Python">Python</IonSelectOption>
                <IonSelectOption value="Java">Java</IonSelectOption>
                <IonSelectOption value="React">React</IonSelectOption>
                <IonSelectOption value="Android">Android</IonSelectOption>
                <IonSelectOption value="Swift">Swift</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Licencia</IonLabel>
              <IonSelect
                value={license}
                onIonChange={(e) => setLicense(e.detail.value)}
                placeholder="Ninguna"
              >
                <IonSelectOption value="">Ninguna</IonSelectOption>
                <IonSelectOption value="mit">MIT License</IonSelectOption>
                <IonSelectOption value="apache-2.0">Apache License 2.0</IonSelectOption>
                <IonSelectOption value="gpl-3.0">GNU GPLv3</IonSelectOption>
                <IonSelectOption value="bsd-3-clause">BSD 3-Clause</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <div className="form-buttons">
            <IonButton expand="block" type="submit" color="primary" disabled={loading}>
              {loading ? (
                <IonSpinner name="crescent" />
              ) : (
                <>
                  <IonIcon slot="start" icon={gitBranch} />
                  Crear Repositorio
                </>
              )}
            </IonButton>
            <IonButton expand="block" type="button" color="medium" fill="outline" onClick={handleReset} disabled={loading}>
              Limpiar Formulario
            </IonButton>
          </div>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          icon={checkmarkCircle}
          position="top"
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
