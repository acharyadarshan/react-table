import React from 'react'

const ViewTable = ({ post, handleViewForm, posts }) => {

  console.log(posts);
  return (
    <>
      {posts.map((post) => (
        <tr key={post.id}>
          <td >{post.userId}</td>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>
          <td>
            <button
              type="button"
              className=" btn btn-primary ml-auto d-block mb-2"
              data-bs-toggle="modal"
              data-bs-target="#editViewForm"
              onClick={(e) => handleViewForm(e, post)}
            >
              View
            </button>
            
          </td>
        </tr>

      ))}

    </>
  )
}

export default ViewTable
