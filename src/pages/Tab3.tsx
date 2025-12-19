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
  IonButton,
  IonSpinner,
  IonText
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { 
  locationOutline, 
  mailOutline, 
  linkOutline, 
  businessOutline,
  logoGithub,
  peopleOutline,
  bookOutline
} from 'ionicons/icons';
import { getUserInfo, User } from '../services/githubService';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUserInfo();
        setUser(userData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

        {!loading && !error && user && (
          <div className="profile-container">
            <IonCard>
              <IonCardHeader className="profile-header">
                <div className="avatar-container">
                  <IonAvatar className="profile-avatar">
                    <img src={user.avatar_url} alt={user.name || user.login} />
                  </IonAvatar>
                </div>
                <IonCardTitle className="profile-name">{user.name || user.login}</IonCardTitle>
                <p className="profile-username">@{user.login}</p>
              </IonCardHeader>

              <IonCardContent>
                {user.bio && (
                  <p className="profile-bio">{user.bio}</p>
                )}

                <div className="profile-stats">
                  <div className="stat-item">
                    <IonIcon icon={bookOutline} />
                    <div>
                      <strong>{user.public_repos}</strong>
                      <span>Repositorios</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <IonIcon icon={peopleOutline} />
                    <div>
                      <strong>{user.followers}</strong>
                      <span>Seguidores</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <IonIcon icon={peopleOutline} />
                    <div>
                      <strong>{user.following}</strong>
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
                {user.company && (
                  <IonItem lines="none">
                    <IonIcon icon={businessOutline} slot="start" />
                    <IonLabel>{user.company}</IonLabel>
                  </IonItem>
                )}
                
                {user.location && (
                  <IonItem lines="none">
                    <IonIcon icon={locationOutline} slot="start" />
                    <IonLabel>{user.location}</IonLabel>
                  </IonItem>
                )}

                {user.email && (
                  <IonItem lines="none">
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>{user.email}</IonLabel>
                  </IonItem>
                )}

                {user.blog && (
                  <IonItem lines="none">
                    <IonIcon icon={linkOutline} slot="start" />
                    <IonLabel>
                      <a href={user.blog} target="_blank" rel="noopener noreferrer">
                        {user.blog}
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
                    <h3>{formatDate(user.created_at)}</h3>
                  </IonLabel>
                </IonItem>

                <div className="profile-actions">
                  <IonButton 
                    expand="block" 
                    href={`https://github.com/${user.login}`} 
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
