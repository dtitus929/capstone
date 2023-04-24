import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from '../../store/lists'
import { Link } from "react-router-dom";
import ListCard from "../ListCard";
import { useParams, useHistory } from "react-router-dom";


function Lists() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const openMenu = () => {
    if (showMenu) return;
    setName('');
    setErrors([]);
    setShowMenu(true);
  };

  // ---------

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  // ---------

  const addList = async (e) => {
    e.preventDefault();

    const data = await dispatch(listActions.addChannelThunk(name, 'standard'));

    if (!data.id) {
      setErrors(data);
      return
    } else {
      closeMenu();
      history.push(`/${data.id}`);
    }


  };


  const { listId } = useParams();


  useEffect(() => {
    dispatch(listActions.getAllListsThunk());
  }, [dispatch]);

  const allLists = useSelector((state) => state.lists.allLists);

  const arrLists = Object.values(allLists);




  return (
    <>


      {arrLists?.map(({ id, name, type }) => (





        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>

          {type === 'inbox' && (
            <>

              <ListCard id={id} name={name} type={type} listId={listId} />

            </>
          )}

        </div >



      ))
      }


      {arrLists?.map(({ id, name, type }) => (


        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>

          {type === 'trash' && (
            <>

              <ListCard id={id} name={name} type={type} listId={listId} />

            </>
          )}

        </div >


      ))
      }

      {/* %%%%%%%%%%%%%%%%%% */}


      <div style={{ fontSize: '14px', margin: '16px 0px 0px 5px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #bcd0eb', paddingTop: '10px' }}>
        <div><span style={{ fontSize: '6px', padding: '0px 3px 2px 0px' }}>&#9660;</span>Lists</div>
        <div><button onClick={openMenu} className="editlist-button" style={{ marginRight: '6px' }}><i className="far fa-plus-square" /></button></div>

        <ul className={ulClassName} ref={ulRef}>
          <div className="add-list-popup">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{
                fontWeight: 'bold', color: '#0060bf'
              }}>Add New List</div>
              <button className="close-popup" onClick={closeMenu}><i className="fas fa-times" /></button>
            </div>

            <div className="form-div">

              {errors.length > 0 &&
                <div style={{ paddingTop: '20px', paddingLeft: '20px', color: 'red', display: 'block' }}>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div >
              }

              <form onSubmit={addList}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  <input className="popup-input-field" type="text" value={name} placeholder="List Name" onChange={(e) => setName(e.target.value)} required />
                  <button className="popup-input-submit" type="submit">Add List</button>

                </div>
              </form>

            </div>

          </div>
        </ul>
      </div>

      {/* %%%%%%%%%%%%%%%%%% */}

      {arrLists?.map(({ id, name, type }) => (


        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>

          {type === 'standard' && (
            <>

              <ListCard id={id} name={name} type={type} listId={listId} />

            </>
          )}

        </div >


      ))
      }


    </>
  );
}

export default Lists;
