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
  IonSearchbar
} from '@ionic/react';
import { useState } from 'react';
import RepositoryItem from '../components/RepositoryItem';
import './Tab1.css';

const mockRepositories = [
  {
    id: 1,
    name: 'cliente-de-github-ionic',
    description: 'Aplicación móvil cliente de GitHub desarrollada con Ionic y React',
    stars: 15,
    language: 'TypeScript',
    isPrivate: false,
    updatedAt: '2024-12-08T10:30:00Z'
  },
  {
    id: 2,
    name: 'proyecto-react-native',
    description: 'Proyecto de aplicación móvil con React Native',
    stars: 8,
    language: 'JavaScript',
    isPrivate: false,
    updatedAt: '2024-12-05T14:20:00Z'
  },
  {
    id: 3,
    name: 'api-rest-nodejs',
    description: 'API REST desarrollada con Node.js y Express',
    stars: 23,
    language: 'JavaScript',
    isPrivate: true,
    updatedAt: '2024-12-07T09:15:00Z'
  },
  {
    id: 4,
    name: 'web-portfolio',
    description: 'Portfolio personal desarrollado con React',
    stars: 5,
    language: 'TypeScript',
    isPrivate: false,
    updatedAt: '2024-11-28T16:45:00Z'
  },
  {
    id: 5,
    name: 'python-data-analysis',
    description: 'Proyecto de análisis de datos con Python y Pandas',
    stars: 12,
    language: 'Python',
    isPrivate: false,
    updatedAt: '2024-12-01T11:00:00Z'
  }
];

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState(mockRepositories);
  const [searchText, setSearchText] = useState('');

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      setRepositories([...mockRepositories]);
      event.detail.complete();
    }, 1000);
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

        <IonList>
          {filteredRepositories.map((repo) => (
            <RepositoryItem
              key={repo.id}
              name={repo.name}
              description={repo.description}
              stars={repo.stars}
              language={repo.language}
              isPrivate={repo.isPrivate}
              updatedAt={repo.updatedAt}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
