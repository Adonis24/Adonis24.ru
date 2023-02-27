import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ clients, setClients }) {
  return (
    <ul className={styles.list}>
      {clients.map((client) => (
        <ListItem
          client={client}
          key={client._id}
          setClients={setClients}
        />
      ))}
    </ul>
  );
}