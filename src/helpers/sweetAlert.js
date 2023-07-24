import Swal from 'sweetalert2';

export const showBasicAlert = (title, icon, text = '') =>
  Swal.fire({
    icon: icon,
    title: title,
    backdrop: 'rgba(0,0,0,0.7)',
    text: text,
  });

  export const question = (title, icon, text) =>
  Swal.fire(
    {
        title,
        text:text,
        icon:icon,
        buttons: true,
        showCancelButton: true,
        confirmButtonText: 'confirmar',
      }).then((willDelete) => {
        if (willDelete.isConfirmed          ) {
          new Swal('Tu registro fue eliminado exitosamente!', {
            icon: 'success',
          });
        } else {
          new Swal('Acción cancelada', {icon:'warning'});
        }
      });
  export const see = (title, imageUrl, width = 500, height = 300, modalWidth = '30%') =>
    new Swal({
      title: title,
      imageUrl,
      width: modalWidth,
      imageWidth: width,
      imageHeight: height,
      imageAlt: 'Custom image',
    });

export const showPasswordInput = (onPasswordEntered) => {
  Swal.fire({
    title: 'Estas seguro de modificar la contraseña?',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Restablecer Contraseña',
        input: 'password',
        inputLabel: 'Nueva Contraseña',
        inputPlaceholder: 'Ingrese su contraseña',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off',
        },
      }).then((result) => {
        if (result.value) {
          const password = result.value;
          onPasswordEntered(password);
        }
      });
    }
  });
};