var sqlMap = {
  getValue: 'SELECT * FROM test WHERE username = ?',
  setValue: 'INSERT INTO test(username,password) VALUES(?,?)',
  getMark: 'SELECT * FROM mark WHERE username = ?',
  deleteMark: 'DELETE FROM mark WHERE lng = ?',
  insertMark: 'INSERT INTO mark(username,title,lng,lat,address,img) VALUES(?,?,?,?,?,?)',
  getAdd: 'SELECT * FROM addme WHERE username = ?',
  deleteAdd: 'DELETE FROM addme WHERE lng = ?',
  insertAdd: 'INSERT INTO addme(username,title,lng,lat,address,img) VALUES(?,?,?,?,?,?)'
}

module.exports = sqlMap;
