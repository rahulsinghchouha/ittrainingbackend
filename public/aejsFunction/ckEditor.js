document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.querySelector('#editor');
    if (editorElement) {
      ClassicEditor.create(editorElement, {
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'underline', 'strikethrough', '|',
          'bulletedList', 'numberedList', '|',
          'link', 'blockQuote', 'insertTable', 'undo', 'redo'
        ],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        }
      })
        .then(editor => {
          console.log('CKEditor initialized:', editor);
        })
        .catch(error => {
          console.error('Error initializing CKEditor:', error);
        });
    }
  });
  