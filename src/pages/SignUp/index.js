import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextInput } from "../../components";
import firebase from "../../config/Firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const history = useHistory();
  const onSubmit = () => {
    const data = {
      email: email,
      fullName: fullName,
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const userId = res.user.uid;
        firebase
          .database()
          .ref("users/" + userId)
          .set(data);

        history.push("/sign-in");
      })
      .catch((errors) => {
        console.log(console.log(errors));
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="pt-5">
      <div className="text-center" style={{ fontWeight: "bold", fontSize: 24 }}>
        Selamat datang di Sayur CRUD
      </div>
      <div className="text-center mt-2" style={{ fontSize: 15 }}>
        Silahkan melakukan registrasi
      </div>
      <div
        className="container shadow rounded mt-5 col-12 p-3"
        style={{ backgroundColor: "white", width: "400px" }}
      >
        <TextInput
          title="Nama Lengkap"
          placeholder="Masukan nama lengkap anda"
          value={fullName}
          onClick={(e) => setFullName(e.target.value)}
        />
        <TextInput
          title="Email"
          placeholder="Masukan email anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextInput
          title="Password"
          placeholder="Masukan password anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <div className="text-center mt-2">
          <Button buttonText="Login" onClick={onSubmit} />
        </div>
        <div className="text-center">
          Sudah punya account?{" "}
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
