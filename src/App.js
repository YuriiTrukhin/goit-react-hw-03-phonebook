import React, { Component } from "react";
import ContactForm from "../src/components/ContactForm/ContactForm";
import ContactList from "../src/components/ContactList/ContactList";
import Filter from "../src/components/Filter/Filter";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const persistedTask = localStorage.getItem("contacts");
    if (persistedTask) {
      this.setState({
        contacts: JSON.parse(persistedTask),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  toAddContact = (el) => {
    const rule = this.state.contacts.some((contact) => contact.name === el.name);
    if (rule) {
      return alert(`${el.name} уже есть`);
    } else if (el.name.length >= 1) {
      this.setState((prev) => {
        const updateState = [...prev.contacts, el];
        return { contacts: updateState };
      });
    }
  };
  filterRender = (filter) => {
    this.setState({ filter });
  };
  filterTask = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };
  toDelete = (id) => {
    const { contacts } = this.state;
    const obj = contacts.find((el) => el.id === id);
    const index = contacts.indexOf(obj);
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.slice(0, index), ...prevState.contacts.slice(index + 1)],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterText = this.filterTask();
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={this.toAddContact} />
        <h2 className={styles.title}>Contacts</h2>
        {contacts.length > 1 && <Filter value={filter} filterRender={this.filterRender} />}
        <ContactList list={filterText} toDelete={this.toDelete} />
      </div>
    );
  }
}
