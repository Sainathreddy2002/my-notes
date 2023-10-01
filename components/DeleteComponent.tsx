import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { BASE_URL } from "@/constants"
import axios from "axios"
  import { AiFillDelete } from "react-icons/ai"
  
  export function DeleteComponent({id,pageLoad, setPageLoad}:any) {
    const onDelete = ()=>{
        axios.delete(`${BASE_URL}/apiNotes/deleteNote/${id}`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
            console.log(res);
            setPageLoad(!pageLoad)
        })
        .catch((error) => {
            console.log(error);  
        })
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <AiFillDelete/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              notes and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default DeleteComponent