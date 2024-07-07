// ?inputs
const nameIn=document.querySelector('.name-In');
const emailIn=document.querySelector('.email-In');
const passwordIn=document.querySelector('.password-In');
// ?btns
const signUpBtn=document.querySelector('.up-btn');
const signInBtn=document.querySelector('.in-btn');
// ?text
const textup=document.querySelector('.p-up-link');
const textin=document.querySelector('.p-in-link');
// ?links
const linkin=document.querySelector('.up-link');
const linkup=document.querySelector('.in-link');
const logout=document.querySelector('.log-out');
const state=document.querySelector('.state');
// ?variables

let users;
if(JSON.parse(localStorage.getItem('users'))==null){
  users=[];
}else{
  users=JSON.parse(localStorage.getItem('users'));
}
// **functions

function toggle_d_none(){
  nameIn.classList.toggle('d-none');
  signUpBtn.classList.toggle('d-none');
  signInBtn.classList.toggle('d-none');
  textup.classList.toggle('d-none');
  textin.classList.toggle('d-none');
}

function newuser(){
  const user={
    name:nameIn.value,
    email:emailIn.value,
    password:passwordIn.value,
  }
  users.push(user);
}

function emptyinputs(){
  nameIn.value=emailIn.value=passwordIn.value='';
}
// !events
linkin.addEventListener('click',function(e){
  e.preventDefault();
  emptyinputs();
  state.classList.add('d-none');
  toggle_d_none();
})

linkup.addEventListener('click',function(e){
  e.preventDefault();
  emptyinputs();
  state.classList.add('d-none');
 toggle_d_none();
})

signUpBtn.addEventListener('click',function(e){
  e.preventDefault();
  const exist= users.find(u=>u.email===emailIn.value);
  const regex={
    t_name:/^[a-z0-9_-]{3,15}$/,
    t_email:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    t_password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  }
  if(!exist&&regex.t_name.test(nameIn.value)&&regex.t_email.test(emailIn.value)&&regex.t_password.test(passwordIn.value))
  {
    newuser();
    localStorage.setItem('users',JSON.stringify(users));
    emptyinputs();
    state.classList.remove('d-none');
    state.classList.remove('text-danger');
    state.classList.add('text-success');
    state.textContent='success'
  }
  else if(nameIn.value===''||emailIn.value===''||passwordIn.value===''){
    state.classList.remove('d-none');
    state.classList.add('text-danger');
    state.textContent='All inputs required'
  }else if(exist){
    state.classList.remove('d-none');
    state.classList.add('text-danger');
    state.textContent='email already exist'
  }else{
    state.classList.remove('d-none');
    state.classList.add('text-danger');
    state.textContent='invalid email or password'
  }
})

signInBtn.addEventListener('click',function(e){
  e.preventDefault();
  const exist= users.find(u=>u.email===emailIn.value&&u.password===passwordIn.value);
  if(exist){
    document.querySelector('.login').classList.add('d-none');
    document.querySelector('.home-screen').classList.remove('d-none');
    document.querySelector('.wel-message').textContent=`welcome ${exist.name}`;
  }else if(emailIn.value===''||passwordIn.value===''){
    state.classList.remove('d-none');
    state.classList.add('text-danger');
    state.textContent='All inputs required'
  }else if(!exist){
    state.classList.remove('d-none');
    state.classList.add('text-danger');
    state.textContent='incorrect email or password'
  }
})

logout.addEventListener('click',function(e){
  e.preventDefault();
  state.classList.add('d-none');
  emptyinputs();
  document.querySelector('.login').classList.remove('d-none');
  document.querySelector('.home-screen').classList.add('d-none');
})