/* eslint-disable */
import { useState, useEffect, React } from 'react'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list
} from 'firebase/storage'
import { storage } from '../firebaseConfig'
import { v4 } from 'uuid'
import { FiUpload } from 'react-icons/fi';

function Gallery() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])

  const imagesListRef = ref(storage, 'image/chatUploads/')
  const uploadFile = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `image/chatUploads/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url])
        alert(url)
      })
      setImageUpload(null)
    })
  }

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <div className="container">

      <input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <label className="custom-file-input" htmlFor="file-input">
        Choose Image
      </label>
      {imageUpload && (
        <button className="upload-button" onClick={uploadFile}>
          <FiUpload className="upload-icon" />
        </button>
      )}
      <h2 className="gallery-title">Image Gallery</h2>
      <div className="image-container">
        {imageUrls.map((url) => (
          <img src={url} key={url} alt="Uploaded" />
        ))}
      </div>
    </div>
  )
}

export default Gallery
