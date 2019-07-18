// empty wrapper using props.children which React reserves for us
// and children will always refer to the content between
// opening and closing tag of component

const aux = props => props.children;

// is props.children a set of adjacent elements here?
// kind of, but no. 
// following JS rules, you can only return one expression
// because React.createElement() is called behind the scenes
// and can only create ONE element

export default aux;