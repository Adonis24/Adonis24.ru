import { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

export default function Details({ details, project, setProject }) {
  const handleDetails = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProject({ ...project, details: values });
  };
  const handleRemove = (i) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProject({ ...project, details: values });
    }
  };

  return (
    <div>
      <div className={styles.header}>Детальное описание </div> 
      {details.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProject({
              ...project,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}

      { details
        ? details.map((detail, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(1)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProject({
                      ...project,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            </div>
        )):""}
   
    </div>
  );
}

/*
  {details.map((detail, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProject({
                      ...project,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            </div>
          ))*/