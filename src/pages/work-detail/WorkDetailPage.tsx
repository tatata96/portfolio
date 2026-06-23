import { Navigate, useParams } from "react-router-dom";
import { workItems } from "../work/workItems";
import "./work_detail_page.css";

function WorkDetailPage() {
  const { slug } = useParams();
  const workItem = workItems.find((item) => item.slug === slug);

  if (!workItem) {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="work-detail-page">
      <h1>{workItem.title}</h1>
    </main>
  );
}

export default WorkDetailPage;
