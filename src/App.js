import React, { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      {
        id: 'id-1',
        name: 'Rosie Simpson',
        number: '459-12-56',
        completed: false,
      },
      {
        id: 'id-2',
        name: 'Hermione Kline',
        number: '443-89-12',
        completed: false,
      },
      {
        id: 'id-3',
        name: 'Eden Clements',
        number: '645-17-79',
        completed: false,
      },
      {
        id: 'id-4',
        name: 'Annie Copeland',
        number: '227-91-26',
        completed: false,
      },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
      completed: false,
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  toggleCompleted = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.map(contact =>
        contact.id === contactId
          ? { ...contact, completed: !contact.completed }
          : contact,
      ),
    }));
  };

  hangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  getCompletedContactCount = () => {
    const { contacts } = this.state;

    return contacts.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { contacts, filter } = this.state;

    const totalContactsCount = contacts.length;
    const completeContactsCount = this.getCompletedContactCount();
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={s.container}>
        <h1 className={s.mainTitle}>Phonebook</h1>
        <p className={s.text}>All contacts: {totalContactsCount}</p>
        <p className={s.text}>Number of selected: {completeContactsCount} </p>

        <ContactForm onSubmit={this.addContact} />
        <h2 className={s.mainTitle}>Contacts</h2>
        <Filter value={filter} onChange={this.hangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
          onToggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
