// @Description: This file define flowRouter of all useCase.
// @Author: toanpp, truongtk, linhnh, nathando

// Intro route


// Login route
FlowRouter.route('/', {
  name: 'Home',
  action() {
    React.render(<App />, document.getElementById("render-target"));
  },
});
