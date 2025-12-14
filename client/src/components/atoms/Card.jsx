import { jwtDecode } from "jwt-decode";

export default function Card({
  id,
  name,
  description,
  price,
  image,
  handleView,
  handleDelete,
}) {
  const item = { id, name, description, price, image, handleView };
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p className="price">${price}</p>
      {(() => {
        const userData = jwtDecode(localStorage.getItem("jwtToken"));
        return (
          userData.type === "" && (
            <div className="actions">
              <button
                onClick={() => {
                  handleView(item);
                }}
              >
                Editar
              </button>
              <button
                onClick={() => {
                  handleDelete(item);
                }}
              >
                Eliminar
              </button>
            </div>
          )
        );
      })()}
    </div>
  );
}
