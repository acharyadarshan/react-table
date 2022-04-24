import React, { useEffect, useState } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";
import { useHistory } from "react-router-dom";
import ReadTable from './ReadTable';
import ViewTable from './ViewTable';


const Tables = () => {

  let history = useHistory();

  const [posts, setPosts] = useState([])

  const [addPost, setAddPost] = useState({
    userId: 10,
    title: '',
    body: ''
  })

  //Get ID
  const [editPostId, setEditPostId] = useState(null)

  const [editFormData, setEditFormData] = useState({
    userId: 10,
    title: '',
    body: ''
  })
  //Get ID for view
  const [viewPostId, setViewPostId] = useState(null)

  const [viewFormData, setViewFormData] = useState({
    userId: 10,
    title: '',
    body: ''
  })

  //Get Form Values
  const handleChange = (input) => (e) => {
    e.preventDefault()
    console.log(addPost);
    setAddPost({ ...addPost, [input]: e.target.value });
  }


  //Add Data To Table
  const handleAddPost = (e) => {
    e.preventDefault()

    const newPost = {
      id: nextId(),
      userId: addPost.userId,
      Name: addPost.title,
      Post: addPost.body
    }

    const newPosts = [...posts, newPost]
    setPosts(newPosts)
    history.push('/')
    console.log(newPosts);
  }

  //Edit data
  const handleEditPostForm = (e, post) => {
    e.preventDefault()
    setEditPostId(post.id)
    console.log(post.id);

    const formValues = {
      userId: post.userId,
      Name: post.title,
      Post: post.body
    }

    setEditFormData(formValues)
  }

  //View data
  const handleViewForm = (e, post) => {
    e.preventDefault()
    setViewPostId(post.id)
    console.log(post.id);

    const formValues = {
      userId: post.userId,
      title: post.title,
      body: post.body
    }

    setViewFormData(formValues)
  }
  

  //Edit Form Data
  const handleEditFormClick = (input) => (e) => {
    e.preventDefault()
    console.log(editFormData);
    setEditFormData({ ...editFormData, [input]: e.target.value });
  }

  //View Form Data
  const handleViewFormClick = (input) => (e) => {
    e.preventDefault()
    console.log(viewFormData);
    setEditFormData({ ...viewFormData, [input]: e.target.value });
  }

  //Save Form Data
  const handleFormSave = (e) => {
    e.preventDefault()

    const savePost = {
      id: editPostId,
      userId: editFormData.userId,
      title: editFormData.title,
      body: editFormData.body
    }

    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId);

    newPosts[formIndex] = savePost

    setPosts(newPosts)
    setEditPostId(null)
    console.log(editPostId);
  }
  //Save Form Data for view
  const handleViewFormSave = (e) => {
    e.preventDefault()

    const savePost = {
      id: viewPostId,
      userId: viewFormData.userId,
      title: viewFormData.title,
      body: viewFormData.body
    }

    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === viewPostId);

    newPosts[formIndex] = savePost

    setPosts(newPosts)
    setViewPostId(null)
    console.log(viewPostId);
  }

  //Delete Data
  const handleDelete = (e) => {
    e.preventDefault()
    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId);

    newPosts.splice(formIndex, 1);

    setPosts(newPosts)

    console.log(newPosts);
  }


  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("")
  function search() {
    return posts.filter(row => row.title.toLowerCase().indexOf(searchQuery) > - 1)

  }

  //Get Data From JSON Placeholder
  
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPosts(data.data)
      console.log(data.data);
      return data
    }
    fetchData()
  }, [])


  return (
    <div>
      <div className="d-flex flex-row">
        <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2" data-bs-toggle="modal" data-bs-target="#addModalForm">
          Add Data +
        </button>

        <form className="row g-3 ms-auto">
          <div className="col-auto">
            <input
              type="text"
              className="form-control ms-auto"
              placeholder="search data"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

      </div>
      <table className="table table-bordered border-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Posts</th>
            <th scope="col">Action</th>
            
          </tr>
        </thead>
        <tbody>
          <ReadTable
            posts={search(posts)}
            handleEditPostForm={handleEditPostForm} />
          <ViewTable
            posts={search(posts)}
            handleViewForm={handleViewForm} />
        </tbody>
      </table>
      {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    placeholder={addPost.userId}
                    required
                    onChange={handleChange("userId")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    required
                    onChange={handleChange("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Body</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="body"
                    placeholder="body"
                    required
                    onChange={handleChange("body")}
                  ></textarea>
                </div>
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">See Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> */}
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Row</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    value={editFormData.userId}
                    required
                    onChange={handleEditFormClick("userId")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={editFormData.title}
                    required
                    onChange={handleEditFormClick("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Post</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="body"
                    value={editFormData.body}
                    required
                    onChange={handleEditFormClick("body")}
                  ></textarea>
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >Update</button>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                    onClick={handleDelete}
                  >Delete Row</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*View Modal */}
      <div className="modal fade" id="editViewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleViewFormSave}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    value={viewFormData.userId}
                    required
                    onChange={handleViewFormClick("userId")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={viewFormData.title}
                    required
                    onChange={handleViewFormClick("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Post</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="body"
                    value={viewFormData.body}
                    required
                    onChange={handleViewFormClick("body")}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}

export default Tables