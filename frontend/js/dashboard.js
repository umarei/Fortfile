async function loadFiles() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await fetch('http://localhost:5001/api/files', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
      const fileList = document.getElementById('file-list');
      fileList.innerHTML = '<h3>Files:</h3>';
      data.files.forEach((file) => {
        const fileElement = document.createElement('p');
        fileElement.textContent = file.filename;
        fileList.appendChild(fileElement);
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error loading files:', error);
  }
}
