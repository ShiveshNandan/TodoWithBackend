const {Router} = require('express');
const { getToDo,saveToDo, deleted, complete } = require('../controllers/todocontrollers');

const router = Router();

router.get('/', 
 (req, res) => {
     res.json({newTitle: "let's start...."})
}
// getToDo
);
router.post('/save',saveToDo);
router.post('/update',complete);
router.post('/delete',deleted);

module.exports = router;
