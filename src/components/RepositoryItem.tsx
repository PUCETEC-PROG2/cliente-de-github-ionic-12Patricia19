import { IonItem, IonLabel, IonNote, IonIcon, IonButton, IonAlert } from '@ionic/react';
import { logoGithub, star, gitBranch, trash, create } from 'ionicons/icons';
import { Repository } from '../services/githubService';
import './RepositoryItem.css';

interface RepositoryItemProps {
  repository: Repository;
  onDelete: (repo: Repository) => void;
  onEdit: (repo: Repository) => void;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ 
  repository,
  onDelete,
  onEdit
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
          {repository.name}
          {repository.private && <IonNote color="warning" style={{ marginLeft: '8px' }}>Privado</IonNote>}
        </h2>
        {repository.description && <p>{repository.description}</p>}
        <div className="repository-details">
          {repository.language && (
            <span className="repository-language">
              <IonIcon icon={gitBranch} size="small" /> {repository.language}
            </span>
          )}
          <span className="repository-stars">
            <IonIcon icon={star} size="small" /> {repository.stargazers_count}
          </span>
          <span className="repository-updated">
            Actualizado el {formatDate(repository.updated_at)}
          </span>
        </div>
      </IonLabel>
      <IonButton fill="clear" slot="end" onClick={() => onEdit(repository)}>
        <IonIcon icon={create} color="primary" />
      </IonButton>
      <IonButton fill="clear" slot="end" onClick={() => onDelete(repository)}>
        <IonIcon icon={trash} color="danger" />
      </IonButton>
    </IonItem>
  );
};

export default RepositoryItem;
