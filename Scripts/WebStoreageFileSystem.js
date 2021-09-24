
//deleteFile();

function buttonDisable() {

    var allButton = document.getElementsByTagName("button");
    for (var i = 0; i < allButton.length; i++) {
        allButton[i].disabled = true;
    }

}

function buttonEnable() {

    var allButton = document.getElementsByTagName("button");
    for (var i = 0; i < allButton.length; i++) {
        allButton[i].disabled = false;
    }

}

function finalCallToSave() {
    buttonDisable();

    timeoutInSaveAsync();

    setTimeout(function () {
        buttonEnable();
    }, 2700);

}

function timeoutInSaveAsync(milliseconds) {


    saveData();
    setInterval(function () {
        fillPerson();
    }, 2000);


}

function saveData() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);
    function handleError(error) {
        alert('Save data ' + error.code);
    }
    function getFile(fileSystem) {
        fileSystem.root.getFile("example.txt", { create: true }, fileOpened, handleError);

        function fileOpened(fileEntry) {
            fileEntry.createWriter(writeToFile, handleError);
        }
        function writeToFile(fileWriter) {
            fileWriter.onwriteend = function () { console.log('Success'); };
            fileWriter.onerror = function () { console.log('Failed'); };
            var id = $("#id").val();
            var name = $("#name").val();
            var age = $("#age").val();
            var gender = $("input[name='gender']:checked").val();
            fileWriter.seek(fileWriter.length);
            fileWriter.write(new Blob([id + '***' + name + '***' + age + '***' + gender + '****'], { type: 'text/plain' }));


        }

    }
}



function finalCallToUpdate() {

    buttonDisable();
    fillPersonUpdate(0);
    setTimeout(fillPerson, 2000);

    function fillPersonUpdate(id) {
        var existingData = [];
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleErrorU);
        function getFile(fileSystem) {
            fileSystem.root.getFile("example.txt", { create: true }, fileOpenedU, handleErrorU);
        }

        function fileEntryFileU(fileEntry, millisecond) {
            var derffered = $.Deferred();

            fileEntry.file(readFileU, handleErrorU);
            setTimeout(function () {
                derffered.resolve();
            }, millisecond);
            return derffered.promise();
        }

        function fileCreateWriterU(fileEntry, millisecond) {
            var derffered = $.Deferred();
            fileEntry.createWriter(writeFileU, handleErrorU);
            setTimeout(function () {
                derffered.resolve();
            }, millisecond);
            return derffered.promise();
        }


        function fileOpenedU(fileEntry) {

            fileEntryFileU(fileEntry, 250).done(function () {

                fileCreateWriterU(fileEntry, 2000).done(function () {

                    fillPerson();

                });


            })

        }
        function readFileU(file) {
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                var id = $("#id").val();
                var name = $("#name").val();
                var age = $("#age").val();
                var gender = $("input[name='gender']:checked").val();
                var newData = [id + '***' + name + '***' + age + '***' + gender];
                try {
                    existingData = this.result.split('****');

                } catch {

                    return;
                }

                delete existingData[existingData.length - 1];
                for (var i = 0; i < existingData.length; i++) {

                    if (existingData[i].split("***")[0] == id) {

                        existingData[i] = newData;


                        break;

                    }

                }

            };
            fileReader.onerror = function () { alert(' Read File Failed'); };
            fileReader.readAsText(file);


        }

        function writeFileU(fileWriter) {

            fileWriter.seek(0);
            fileWriter.write(new Blob([existingData.join('****')], { type: 'text/plain' }));
        }
        function handleErrorU(error) {
            alert('Fail data' + error.code);
        }
    }

    setTimeout(function () {
        buttonEnable();
    }, 2700);


}


function finalCallToDelete(id) {

    buttonDisable();

    fillPersonDelete(id);
    setTimeout(fillPerson, 2000);

    function fillPersonDelete(id) {


        var $SelectedRow = $("#tr_" + id);
        var childernList = $SelectedRow.children();

        $("#id").val(childernList[0].innerHTML);
        $("#name").val(childernList[1].innerHTML);
        $("#age").val(childernList[2].innerHTML);


        if (childernList[3].innerHTML == "male") {
            document.getElementById("female").checked = false;
            document.getElementById("male").checked = true;
        }
        else {
            document.getElementById("female").checked = true;
            document.getElementById("male").checked = false;
        }



        var existingData = [];
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleErrorU);
        function getFile(fileSystem) {
            fileSystem.root.getFile("example.txt", { create: true }, fileOpenedU, handleErrorU);
        }

        function fileEntryFileU(fileEntry, millisecond) {
            var derffered = $.Deferred();

            fileEntry.file(readFileU, handleErrorU);
            setTimeout(function () {
                derffered.resolve();
            }, millisecond);
            return derffered.promise();
        }

        function fileCreateWriterU(fileEntry, millisecond) {
            var derffered = $.Deferred();
            fileEntry.createWriter(writeFileU, handleErrorU);
            setTimeout(function () {
                derffered.resolve();
            }, millisecond);
            return derffered.promise();
        }


        function fileOpenedU(fileEntry) {

            fileEntryFileU(fileEntry, 250).done(function () {

                fileCreateWriterU(fileEntry, 2000).done(function () {

                    fillPerson();

                });


            })

        }
        function readFileU(file) {
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                var id = $("#id").val();
                var name = $("#name").val();
                var age = $("#age").val();
                var gender = $("input[name='gender']:checked").val();
                var newData = [id + '***' + name + '***' + age + '***' + gender];
                try {
                    existingData = this.result.split('****');

                } catch {

                    return;
                }

                delete existingData[existingData.length - 1];
                for (var i = 0; i < existingData.length; i++) {

                    if (existingData[i].split("***")[0] == id) {

                        delete existingData[i];

                        break;

                    }

                }

            };
            fileReader.onerror = function () { alert(' Read File Failed'); };
            fileReader.readAsText(file);


        }

        function writeFileU(fileWriter) {

            fileWriter.seek(0);
            fileWriter.write(new Blob([existingData.join('****')], { type: 'text/plain' }));
        }
        function handleErrorU(error) {
            alert('Fail data' + error.code);
        }
    }


    setTimeout(function () {
        buttonEnable();
    }, 2700);

}

function fillPerson() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);
    function getFile(fileSystem) {
        fileSystem.root.getFile("example.txt", { create: true }, fileOpened, handleError);
    }
    function fileOpened(fileEntry) {
        fileEntry.file(readFile, handleError);
    }
    function readFile(file) {
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {

            $("#output").html();
            var table = '<table id="myTable"><tr><th>Id</th><th>Name</th><th>Age</th><th>Gender</th><th>update</th><th>delete</th></tr>';
            var existingData = e.target.result.split('****');

            for (var i = 0; i < existingData.length; i++) {


                if (existingData[i] != undefined && existingData[i] != '') {
                    var singleExisting = existingData[i];

                    var splitExisting = singleExisting.split('***');
                    if (!isNaN(splitExisting[0]))
                        table += '<tr id="' + 'tr_' + splitExisting[0] + '"><td>' + splitExisting[0] + '</td><td>' + splitExisting[1] +
                            '</td><td>' + splitExisting[2] + '</td><td>' + splitExisting[3] + '</td><td> <button  onclick=updateFunction(' + splitExisting[0] + ')>Update</button></td><td><button onclick=finalCallToDelete(' + splitExisting[0] + ')>Delete</button></td></tr>';

                }


            }
            // no more results
            table += '</table>';

            $("#output").html(table);
        };
        fileReader.onerror = function () { alert(' Read File Failed'); };
        fileReader.readAsText(file);
    }
    function handleError(error) {
        alert('Fail data' + error.code);
    }
}




function deleteFile() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);
    function getFile(fileSystem) {
        fileSystem.root.getFile("example.txt", { create: true }, fileOpened, handleError);
    }
    function fileOpened(fileEntry) {
        fileEntry.remove(fileRemoved, handleError);
    }
    function fileRemoved() {
        alert('delete File Success');
    }
    function handleError(error) {
        alert('delete file  ' + error.code);
    }
}


function updateFunction(id) {

    buttonDisable();

    var $SelectedRow = $("#tr_" + id);
    var childernList = $SelectedRow.children();

    $("#id").val(childernList[0].innerHTML);
    $("#name").val(childernList[1].innerHTML);
    $("#age").val(childernList[2].innerHTML);


    if (childernList[3].innerHTML == "male") {
        document.getElementById("female").checked = false;
        document.getElementById("male").checked = true;
    }
    else {
        document.getElementById("female").checked = true;
        document.getElementById("male").checked = false;
    }

    setTimeout(function () {
        buttonEnable();
    }, 2700);

}


$(document).ready(function () {

    fillPerson();

    $("#id").on("blur", function () {

        $("#myTable tr").each(function () {

            if ($(this).find("td:eq(0)").text() == $("#id").val()) {

                $("#id").val('');
                $("#name").val('');
                $("#age").val('');
                $("#gender").val('');


            }
        })

    });
});



