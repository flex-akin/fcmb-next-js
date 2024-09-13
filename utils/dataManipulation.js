export const getFirstLetter = (username) => {
    if(username){
    return String(username.trim()).charAt(0)
    }
}

export const getFullName = (username) => {
    if(username){
    return String(username).replace(".", " ")
    }
}

export const getFirstName = (username) => {
    username = String(username).split(".")
    username = username[0]
    return username
}
export const timeManipulation= (time) => {
    time = String(time).split("T")
    time = time[0]
    return time
}

export const getLastName = (username) => {
    username = String(username).split("@")
    username = username[0].split(".")
    username = username[1]
    return username
}