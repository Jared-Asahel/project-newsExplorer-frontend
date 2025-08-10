import SavedContext from "../../context/SavedContext";
import { useContext } from "react";
import Card from "../../MainPublic/components/Card/Card";

const SavedArticles = () => {
  const { savedArticles } = useContext(SavedContext);

  return (
    <div className="saved">
      <div className="saved__container">
        {savedArticles.map((article, index) => (
          <Card key={index} article={article} notSaved />
        ))}
      </div>
    </div>
  );
};

export default SavedArticles;
