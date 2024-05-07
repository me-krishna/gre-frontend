import { toast } from "react-toastify"


const congig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const error = (message: string) => {
  toast.error(message, {
    ...congig,
    position: "top-right",
  })
}