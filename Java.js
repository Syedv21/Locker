// Firebase Config (replace with your Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCj8aBqLdQyHuFg9R54RO0UbH19IZO8P7M",
  authDomain: "locker-fc223.firebaseapp.com",
  projectId: "locker-fc223"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Show/hide sections
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("lockerSection").style.display = "block";
  } else {
    document.getElementById("authSection").style.display = "block";
    document.getElementById("lockerSection").style.display = "none";
  }
});

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signed up successfully!"))
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in!"))
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut();
}

// Cloudinary Upload
const cloudName = 'dwvziqwve';
const uploadPreset = 'MyPhotos';

function uploadPhoto() {
  const fileInput = document.getElementById("photoInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Select a photo");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById("photoGallery");
    const img = document.createElement("img");
    img.src = data.secure_url;
    gallery.appendChild(img);
  })
  .catch(err => console.error("Upload error:", err));
}