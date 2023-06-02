import Head from "next/head";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.headline}>
          Your <span>old</span> place could be someones <span>new</span> dream
        </h1>

        <div className={styles.content}>
          <h2>First, let's get some information</h2>

          <form action="/buyers" method="GET" className={styles.form}>
            <label>
              <span className={styles.label}>Zip Code</span>
              <input
                name="zipCode"
                type="text"
                pattern="[0-9]{4,4}"
                title="Zip code should be 4 digits (0 to 9)"
                required
              />
            </label>
            <label>
              <span className={styles.label}>Property type</span>
              <select className={styles.dropdown} name="propertyType">
                <option value="1">Villa</option>
                <option value="2">Villalejlighed</option>
                <option value="3">Rækkehus</option>
                <option value="4">Ejerlejlighed</option>
                <option value="5">Fritidshus</option>
                <option value="6">Fritidsgrund</option>
                <option value="7">Helårsgrund</option>
                <option value="8">Andelsbolig</option>
                <option value="9">Landejendom</option>
              </select>
            </label>
            <label>
              <span className={styles.label}>Price</span>
              <input
                name="price"
                type="text"
                pattern="[0-9]{6,}"
                title="Price should be digits (0 to 9) and at minimum 100000"
                required
              />
            </label>
            <label>
              <span className={styles.label}>Size (kvm)</span>
              <input name="size" type="number" required />
            </label>
            <button className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
