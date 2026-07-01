import { useEffect, useState } from "react";
import { getLists } from "../../services/lists";
import LibrarySection from "../../Components/LibrarySection";

function Lists() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data)
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }

    fetchLists()
  }, [])


  return (
    <>
        
      <LibrarySection
        title="✨ Want to Read"
        books={lists.wantToRead}
      />

      <LibrarySection
        title="📖 Currently Reading"
        books={lists.currentlyReading}
      />

      <LibrarySection
        title="🏆 Finished"
        books={lists.finished}
      />
    </>
  );
}

export default Lists;