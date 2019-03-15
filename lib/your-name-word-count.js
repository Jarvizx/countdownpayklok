import YourNameWordCountView from './your-name-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  yourNameWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.yourNameWordCountView = new YourNameWordCountView(state.yourNameWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yourNameWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'your-name-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yourNameWordCountView.destroy();
  },

  serialize() {
    return {
      yourNameWordCountViewState: this.yourNameWordCountView.serialize()
    };
  },

  toggle() {
    console.log('YourNameWordCount was toggled!');
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.yourNameWordCountView.setCount(words);
      this.modalPanel.show();
    }
  }

};