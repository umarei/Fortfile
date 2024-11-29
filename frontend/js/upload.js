async function uploadFile(file) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !role) return;

  // Role-based file size restrictions
  const maxSize = role === 'free' ? 300 * 1024 * 1024 : role === 'basic' ? 1 * 1024 * 1024 * 1024 : Infinity;
  if (file.size > maxSize) {
    alert('File size exceeds your role limit.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5001/api/files/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('File uploaded successfully');
      loadFiles();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

document.getElementById('upload-button')?.addEventListener('click', () => {
  const fileInput = document.getElementById('file-input');
  if (fileInput?.files[0]) {
    uploadFile(fileInput.files[0]);
  }
});
