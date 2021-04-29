import React, { useState } from "react";
import { Button, TextInput } from "../../components";
import firebase from "../../config/Firebase";
import { useHistory, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push("/");
        setEmail("");
        setPassword("");
      })
      .catch((errors) => {
        console.log(console.log(errors));
      });
  };

  return (
    <div className="pt-5">
      <div className="text-center" style={{ fontWeight: "bold", fontSize: 24 }}>
        Selamat datang di Sayur CRUD
      </div>
      <div className="text-center mt-2" style={{ fontSize: 15 }}>
        Silahkan Login
      </div>
      <div
        className="container shadow rounded mt-5 col-12 p-3"
        style={{ backgroundColor: "white", width: "400px" }}
      >
        <TextInput
          title="Email"
          placeholder="Masukan email anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          title="Password"
          placeholder="Masukan password anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-2">
          <Button buttonText="Login" onClick={onSubmit} />
        </div>

        <div className="text-center">
          Belum punya account?{" "}
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
