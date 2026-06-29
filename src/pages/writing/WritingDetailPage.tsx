import { useNavigate, useParams } from 'react-router-dom';
import { contentById } from '../../data/content';
import Detail from './Detail';

function WritingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = id ? contentById[id] : undefined;

  if (!item) {
    navigate('/');
    return null;
  }

  return <Detail item={item} onClose={() => navigate(-1)} />;
}

export default WritingDetailPage;
