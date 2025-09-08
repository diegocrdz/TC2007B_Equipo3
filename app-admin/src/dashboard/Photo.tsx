export const Photos = () => {
  return (
    <section>
      <h1>The Beatles:</h1>
      <Photo />
      <Colores color = "negro" />
    </section>
  );
};

function Photo() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Beatles_members_at_New_York_City_in_1964.jpg/800px-The_Beatles_members_at_New_York_City_in_1964.jpg"
      alt="Beatles"
    />
  )
};

function Colores(props){ 
  return (<h2> Estoy pensando en el color: {props.color} </h2>);
};