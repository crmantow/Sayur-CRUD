import React, { useState, useEffect } from "react";
import { Button, Navbar, TextInput } from "../../components";
import firebase from "../../config/Firebase";

const Dashboard = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [jenisProduk, setJenisProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [button, setButton] = useState("Tambah Produk");
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("products")
      .on("value", (res) => {
        if (res.val()) {
          const rawData = res.val();
          const productArr = [];

          Object.keys(rawData).map((item) =>
            productArr.push({
              id: item,
              ...rawData[item],
            })
          );
          setProduk(productArr);
        }
      });
  }, []);

  const resetForm = () => {
    setNamaProduk("");
    setJenisProduk("");
    setHargaProduk("");
    setButton("Tambah Produk");
    setSelectedProduct({});
  };

  const onSubmit = () => {
    const data = {
      namaProduk: namaProduk,
      jenisProduk: jenisProduk,
      hargaProduk: hargaProduk,
    };
    console.log(data);
    if (button === "save") {
      firebase.database().ref("products").push(data);
    } else {
      firebase.database().ref(`products/${selectedProduct.id}`).set(data);
    }
    resetForm();
  };

  const onUpdateData = (item) => {
    setNamaProduk(item.namaProduk);
    setHargaProduk(item.hargaProduk);
    setJenisProduk(item.jenisProduk);
    setButton("Update");
    setSelectedProduct(item);
  };

  const onDelete = (item) => {
    firebase.database().ref(`products/${item.id}`).remove();
  };

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <Navbar />
      <div className="container">
        <h4 className="mt-5 text-center">Tambah Product</h4>
        <hr />
        <div className="container col-6">
          <TextInput
            title="Nama Produk"
            placeholder="Masukan nama produk"
            value={namaProduk}
            onChange={(e) => {
              setNamaProduk(e.target.value);
            }}
          />
          <TextInput
            title="Jenis Produk"
            placeholder="Masukan jenis produk"
            value={jenisProduk}
            onChange={(e) => {
              setJenisProduk(e.target.value);
            }}
          />
          <TextInput
            title="Harga"
            placeholder="Masukan harga produk"
            value={hargaProduk}
            onChange={(e) => {
              setHargaProduk(e.target.value);
            }}
          />
          <div className="text-end mt-4">
            <Button buttonText={button} onClick={onSubmit} />
            {button === "Update" && (
              <button className="btn btn-warning" onClick={resetForm}>
                Cancel Update
              </button>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="container mt-5 col-7">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Jenis Produk</th>
              <th>Harga Produk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((item) => (
              <tr key={item.id}>
                <td>{item.namaProduk}</td>
                <td>{item.jenisProduk}</td>
                <td>{item.hargaProduk}</td>
                <td>
                  <button
                    className="btn btn-success"
                    style={{ marginRight: 20 }}
                    onClick={() => onUpdateData(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
