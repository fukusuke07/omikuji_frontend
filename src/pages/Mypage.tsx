import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Theme } from "@mui/material/styles"

import { fontTheme } from '../assets/Themes/FontTheme';
import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import Button from "@mui/material/Button"

import Avatar from "@mui/material/Avatar"

import Miko from 'assets/images/jinja_miko_avatar.png';

import { CenterWashi } from "../components/CenterWashi"
import { CenterBox } from "../components/CenterBox"
import { CenterList } from "../components/CenterList";
import { Score, User } from "interfaces/index"

import { UpdateUserFormData } from "interfaces/index"
import { Typography,Box } from "@mui/material";
import { createTheme } from "@mui/material/";

const defaultTheme = createTheme()

interface OwnProps {
    score: Score | null ,
    user: User | null,
    loading: boolean,
    updateUser: Function,
    signOut: Function
    deleteUser:Function,
  
  }
  
  type Props = OwnProps

// ホーム（マイページ的な）
export default function Home(props:Props) {

  const histroy = useHistory()

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(props.user?.name)
  const [email, setEmail] = useState<string | undefined>(props.user?.email)
  const [preview, setPreview] = useState<string>("")

  const [updateUserFormData, setUserFormData] = useState<UpdateUserFormData | null>(null)
  const [execSignOut,setExecSignOut] = useState<number>(0)
  const [execDeleteUser,setExecDeleteUser] = useState<number>(0)

  useEffect(() => {

    let unmounted = false;

    const f = async () => {
      if(!unmounted && updateUserFormData != null){

        await new Promise((resolve, reject) => {
        props.updateUser({
        delay: 1500,
        updateUserFormData: updateUserFormData,
        promise: { resolve, reject }
      });
    }).then(result => {

    }).catch(error => {
      
    })
    setUserFormData(null)
      }
      
  };
  f();
  return ()=>{ unmounted = true; };
 }, [updateUserFormData])

  useEffect(() => {

    let unmounted = false;

    const f = async () => {
      if(!unmounted && execDeleteUser > 0){
        await new Promise((resolve, reject) => {
        props.deleteUser({
        delay: 1500,
        promise: { resolve, reject }
      });
    }).then(result => {
      histroy.push("/DeleteUser")

    }).catch(error => {
      histroy.push("/Error")
      
    })
    setExecDeleteUser(0)
      }
      
  };
  f();
  return ()=>{ unmounted = true; };
 }, [execDeleteUser])

 useEffect(() => {

    let unmounted = false;
    
    const f = async () => {
      if(!unmounted && execSignOut >0){
        await new Promise((resolve, reject) => {
        props.signOut({
        delay: 1500,
        promise: { resolve, reject }
      });
    }).then(result => {
      histroy.push("/signout")
    }).catch(error =>{
      histroy.push("/Error")
    })
    setExecSignOut(0)

      }
      return ()=>{ unmounted = true; };
  };
  f();
 }, [execSignOut])

 const handleDeleteUser = () =>{

    setExecDeleteUser(execDeleteUser+1)

  }

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {

    setExecSignOut(execSignOut+1)
  }


  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData()

    formData.append("name", name || "")

    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setUserFormData(createFormData())
  }

  /*<Grid container justify="flex-end">
                  <Grid item>
                    <IconButton
                      onClick={() => setEditFormOpen(true)}
                    >
                      <SettingsIcon
                        color="action"
                        fontSize="small"
                      />
                    </IconButton>
                  </Grid>
                </Grid>*/

  return (
    <>
      {
        !props.loading && props.user ? (
          <>
            <CenterWashi>
              <CenterBox>
                <Typography style={{textAlign:"left", fontSize:'36px'}} >マイページ</Typography>
              </CenterBox>
              <CenterBox marginTop= "40px" >
                <Avatar
                  alt="avatar"
                  src={Miko}
                  sx={{
                    width: defaultTheme.spacing(24),
                    height: defaultTheme.spacing(24),
                    border: "solid",
                    backGroundColor:"#ffffff"
                  }}
                />
              </CenterBox>
              <CenterList marginTop= "40px" >
                <Box style={{
                  display:"flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  }}>
                  <Typography style={{textAlign:"left",fontSize:'36px',}}>名前…</Typography>
                  <Typography style={{textAlign:"left",fontSize:'36px',}}>{props.user?.name}</Typography>
                </Box>
                <Box style={{
                  display:"flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px"
                  }}>
                  <Typography style={{textAlign:"left",fontSize:'36px',}}>運勢力…</Typography>
                  <Typography style={{textAlign:"left",fontSize:'36px',}}>実装中</Typography>
                </Box>
              </CenterList>
              <Box style={{
                marginLeft:"auto",
                marginRight:"auto",
                width:"80%",
                minWidth:"320px",
                marginTop: "30px"
                }}>
                <Button
                  variant="contained"
                  onClick={handleSignOut}
                  color="primary"
                  fullWidth
                  startIcon={<ExitToAppIcon />}
                  style={{ marginTop: "1rem"}}
                >
                  サインアウト
                </Button>
              </Box>
              <Box style={{
                marginLeft:"auto",
                marginRight:"auto",
                width:"80%",
                minWidth:"320px",
                marginTop: "20px"
                }}>
                <Button 
                  variant="outlined"
                  onClick={handleDeleteUser}
                  color="primary"
                  fullWidth
                  startIcon={<ExitToAppIcon />}
                  style={{ marginTop: "1rem"}}
                >
                  運勢闘技場を退会する
                </Button>
              </Box>
            </CenterWashi>
            <form noValidate autoComplete="off">
              <Dialog
                open={editFormOpen}
                keepMounted
                onClose={() => setEditFormOpen(false)}
              >
                <DialogTitle style={{ textAlign: "center"}}>
                  //プロフィールの変更
                </DialogTitle>
                <DialogContent>
                  //メールアドレスの変更
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="名前"
                    value={name}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                  //パスワードの変更
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="名前"
                    value={name}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={!name ? true : false}
                  >
                    送信
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}