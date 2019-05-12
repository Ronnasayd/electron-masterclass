//Modules
const { ipcRenderer } = require('electron')
const items = require('./items')

// Navigate item with up/down keys
$(document).keydown((e) => {
    switch (e.key) {
        case 'ArrowUp':
            items.changeItem('up')
            break;
        case 'ArrowDown':
            items.changeItem('down')
            break;
    }
})

// Show add modal
$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active');
});

// hidden add modal
$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active');
});

//handle add-modal submission
$('#add-button').click(() => {
    // Get url from input
    let newItemURL = $('#item-input').val();
    if (newItemURL) {
        $('#item-input').prop('disabled', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disabled')

        ipcRenderer.send('new-item', newItemURL)
    }
});

$('#item-input').keyup((e) => {
    if (e.key === 'Enter') {
        $('#add-button').click();
    }
})

ipcRenderer.on('new-item-success', (e, item) => {

    //Add Item to items array
    items.toreadItems.push(item)
    // Save items
    items.saveItems()
    // Add Item
    items.addItem(item)

    // Close and reset modal
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disabled')

    // If fist item  being added select it
    if (items.toreadItems.length === 1)
        $('.read-item:first()').addClass('is-active')
})

$('#search').keyup((e) => {
    // Get current search input
    let filter = $(e.target).val()

    $('.read-item').each((i, el) => {
        $(el).text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide()
    })
})

// Add items when app load
if (items.toreadItems.length) {
    items.toreadItems.forEach(items.addItem)
    $('.read-item:first()').addClass('is-active')
}