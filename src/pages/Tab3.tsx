import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip,
  IonButton
} from '@ionic/react';
import { 
  locationOutline, 
  mailOutline, 
  linkOutline, 
  businessOutline,
  logoGithub,
  peopleOutline,
  bookOutline
} from 'ionicons/icons';
import './Tab3.css';

const mockUser = {
  login: 'usuario-ejemplo',
  name: 'Nombre del Usuario',
  avatar_url: 'https://avatars.githubusercontent.com/u/12345678',
  bio: 'Desarrollador Full Stack apasionado por crear aplicaciones móviles con Ionic y React. Siempre aprendiendo nuevas tecnologías.',
  location: 'Quito, Ecuador',
  email: 'usuario@ejemplo.com',
  blog: 'https://mi-blog.com',
  company: '@MiEmpresa',
  public_repos: 42,
  followers: 128,
  following: 95,
  created_at: '2020-01-15T10:30:00Z'
};

const Tab3: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mi Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="profile-container">
          <IonCard>
            <IonCardHeader className="profile-header">
              <div className="avatar-container">
                <IonAvatar className="profile-avatar">
                  <img src={mockUser.avatar_url} alt={mockUser.name} />
                </IonAvatar>
              </div>
              <IonCardTitle className="profile-name">{mockUser.name}</IonCardTitle>
              <p className="profile-username">@{mockUser.login}</p>
            </IonCardHeader>

            <IonCardContent>
              {mockUser.bio && (
                <p className="profile-bio">{mockUser.bio}</p>
              )}

              <div className="profile-stats">
                <div className="stat-item">
                  <IonIcon icon={bookOutline} />
                  <div>
                    <strong>{mockUser.public_repos}</strong>
                    <span>Repositorios</span>
                  </div>
                </div>
                <div className="stat-item">
                  <IonIcon icon={peopleOutline} />
                  <div>
                    <strong>{mockUser.followers}</strong>
                    <span>Seguidores</span>
                  </div>
                </div>
                <div className="stat-item">
                  <IonIcon icon={peopleOutline} />
                  <div>
                    <strong>{mockUser.following}</strong>
                    <span>Siguiendo</span>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Información de Contacto</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {mockUser.company && (
                <IonItem lines="none">
                  <IonIcon icon={businessOutline} slot="start" />
                  <IonLabel>{mockUser.company}</IonLabel>
                </IonItem>
              )}
              
              {mockUser.location && (
                <IonItem lines="none">
                  <IonIcon icon={locationOutline} slot="start" />
                  <IonLabel>{mockUser.location}</IonLabel>
                </IonItem>
              )}

              {mockUser.email && (
                <IonItem lines="none">
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonLabel>{mockUser.email}</IonLabel>
                </IonItem>
              )}

              {mockUser.blog && (
                <IonItem lines="none">
                  <IonIcon icon={linkOutline} slot="start" />
                  <IonLabel>
                    <a href={mockUser.blog} target="_blank" rel="noopener noreferrer">
                      {mockUser.blog}
                    </a>
                  </IonLabel>
                </IonItem>
              )}
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Información Adicional</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel>
                  <p>Miembro desde</p>
                  <h3>{formatDate(mockUser.created_at)}</h3>
                </IonLabel>
              </IonItem>

              <div className="profile-actions">
                <IonButton 
                  expand="block" 
                  href={`https://github.com/${mockUser.login}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IonIcon slot="start" icon={logoGithub} />
                  Ver en GitHub
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
