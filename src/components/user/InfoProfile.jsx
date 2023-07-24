export const InfoProfile = ({ name }) => {
  return (
    <div>
      <h4 className='text-center text-white mt-4'>
        <b>Perfil de Usuario</b>
      </h4>
      <div className='m-3 alert alert-info mt-4 p-2' role='alert'>
        Hola te damos la bienvenida {name}
      </div>
    </div>
  );
};
