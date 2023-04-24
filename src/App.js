import { useState } from "react";
import usersDetails from './data/userDetails';
import Search from "./Search";
import Card from "./Card";

function App() {

  // const [results, setResults] = useState();

  const [searchField, setSearchField] = useState("")
  const [selectedProfile, setSelectedProfile] = useState();

  let results;

  if (searchField === "") {
    results = [];
  }
  else {
    results = usersDetails.filter(
      person => {
        return (
          person.name.toLowerCase().includes(searchField.toLowerCase())
          ||
          person.email.toLowerCase().includes(searchField.toLowerCase())
          ||
          person.id.toLowerCase().includes(searchField.toLowerCase())
          ||
          person.address.toLowerCase().includes(searchField.toLowerCase())
          ||
          person.pincode.toLowerCase().includes(searchField.toLowerCase())
        );
      }
    );
  }

  console.log(results)

  const handleChange = (e) => {
    setSearchField(e.target.value);
  }

  return (
    <Search
      results={results}
      onChange={handleChange}
      value={selectedProfile?.name}
      onSelect={(item) => setSelectedProfile(item)}
      renderItem={(item) => <Card item={item}></Card>}>

    </Search>
  );
}

export default App;
