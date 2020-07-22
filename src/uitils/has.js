export default (buttons, permission) => {
    if (!permission) { }
    // console.log(permission)
    // console.log(buttons)
    let res = buttons.includes(permission)
    return res
}