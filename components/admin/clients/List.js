import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ clients, setClients }) {
  // const [data, setstate] = useState(clients);

  return (
    <ul className={styles.list}>
      {clients.map((client) => (
        <ListItem
          client={client}
          key={client._id}
          image = {client.image}
          setClients={setClients}
        />
      ))}
    </ul>
  );
}