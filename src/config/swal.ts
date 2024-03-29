import Swal from "sweetalert2";

const swalBackground = `linear-gradient(0deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%),radial-gradient(150% 121.83% at 8.13% 1.86%, rgba(0, 255, 240, 0.20) 0%, rgba(255, 136, 243, 0.20) 100%)`

export function defaultErrorAlert(message: string) {
    Swal.fire({
        icon: "error",
        text: message,
        background: swalBackground,
        title: "错误",
    })
}
