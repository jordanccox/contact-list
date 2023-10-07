import { Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import StartHere from "./components/StartHere";
import NewContact from "./components/NewContact";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import EditContact from "./components/EditContact";
import { useState } from "react";

function App() {
  const [contactList, setContactList] = useState([]);

  const addContact = (data) => {
    const copyOfContactList = contactList.map((contact) => {
      const clone = {...contact};
      return clone;
    });
    copyOfContactList.push(data)
    setContactList(copyOfContactList);
  };

  const replaceContact = (data) => {
    const copyOfContactList = contactList.map((contact) => {
      if (contact.contactId === data.contactId) {
        return data;
      }

      const clone = {...contact};
      return clone;
    });

    setContactList(copyOfContactList);
  };

  const getContact = (contactId) => {
    return contactList.find((element) => element.contactId === contactId);
  };

  const deleteContact = (data) => {
    const copyOfContactList = contactList
    .map((contact) => {
      const clone = {...contact};
      return clone;
    })
    .filter((contact) => {
      if (contact.contactId === data.contactId) {
        return false;
      }
      
      return true;
    });

    setContactList(copyOfContactList);
  };

  const allContacts = () => {
    return contactList;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Root allContacts={allContacts} />}>
          <Route index element={<StartHere />}/>
          <Route path="/new" element={<NewContact addContact={addContact} />} />
          <Route path="/contacts/:contactId">
            <Route index element={<Contact getContact={getContact} deleteContact={deleteContact} />} />
            <Route path="edit" element={<EditContact replaceContact={replaceContact} getContact={getContact} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
