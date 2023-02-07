export default function Person({id}) {
  id += " person";

  return (
    <div className="mx-auto">
      <label htmlFor={id}>{ "E-mail"}</label>
      <input
        type="email"
        className="form-control colorChange"
        id={id}
        placeholder="E-mail"
      />
    </div>
  );
}
