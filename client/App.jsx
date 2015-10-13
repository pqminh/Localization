// App component - represents the whole app
const T = _i18n.createComponent();
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false,
      localization: getLocalization(),
    }
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }

    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user(),
      localization: getLocalization(),
    };
  },

  renderTasks() {
    // Get tasks from this.data.tasks
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addTask", text);

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted() {
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
  },
  onClickChangeLanguage() {
    if (_i18n.getLocale() === 'vi-VN') {
      _i18n.setLocale('en-US');
      setDataToLocalStorage('localization', 'en-US');
      this.setState({
        localization: 'en-US',
      });
      console.log("change completed");
    } else {
      _i18n.setLocale('vi-VN');
      setDataToLocalStorage('localization', 'vi-VN');
      this.setState({
        localization: 'vi-VN',
      });
      console.log("change completed");

    }
  },
  render() {
    return (
      <div className="container">
        <header>
          <h1><T>todoList</T>({this.data.incompleteCount})</h1>
          <button onClick={this.onClickChangeLanguage}><T>changeLanguage</T></button>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
            <T>hideComplete</T>
          </label>

          <AccountsUIWrapper />

          { this.data.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks" />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
