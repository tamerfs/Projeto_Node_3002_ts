// faz a configuração do  banco de dados
import { Pool } from "pg";

const connectionString = 'postgres://rhzobcea:qOEZR-lk9dPCuyNY4XIzpcb5vkApqlyx@motty.db.elephantsql.com/rhzobcea';

const db = new Pool ({connectionString});

export default db;

