import { IonItem, IonLabel, IonNote, IonIcon } from '@ionic/react';
import { logoGithub, star, gitBranch } from 'ionicons/icons';
import './RepositoryItem.css';

interface RepositoryItemProps {
  name: string;
  description?: string;
  stars: number;
  language?: string;
  isPrivate: boolean;
  updatedAt: string;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ 
  name, 
  description, 
  stars, 
  language, 
  isPrivate,
  updatedAt 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <IonItem>
      <IonIcon icon={logoGithub} slot="start" color="medium" />
      <IonLabel>
        <h2>
          {name}
          {isPrivate && <IonNote color="warning" style={{ marginLeft: '8px' }}>Privado</IonNote>}
        </h2>
        {description && <p>{description}</p>}
        <div className="repository-details">
          {language && (
            <span className="repository-language">
              <IonIcon icon={gitBranch} size="small" /> {language}
            </span>
          )}
          <span className="repository-stars">
            <IonIcon icon={star} size="small" /> {stars}
          </span>
          <span className="repository-updated">
            Actualizado el {formatDate(updatedAt)}
          </span>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default RepositoryItem;
