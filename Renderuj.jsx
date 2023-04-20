function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("window", undefined, undefined, { resizeable: true });
    dialog.onResizing = dialog.onResize = function () {
        this.layout.resize();
    };
    return dialog;
}

function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }
    if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}

var win = createDockableUI(this);
win.text = "Renderuj na:";
win.orientation = "column";
win.alignChildren = ["center", "top"];
win.preferredSize.height = 200;
win.spacing = 10;
win.margins = 16;

var montazB = win.add("button", undefined, undefined, { name: "montazB" });
montazB.text = "Montaż";
montazB.preferredSize.width = 90;

var studioB = win.add("button", undefined, undefined, { name: "button2" });
studioB.text = "Studio";
studioB.preferredSize.width = 90;

var obaB = win.add("button", undefined, undefined, { name: "obaB" });
obaB.text = "Oba";
obaB.preferredSize.width = 90;

var meB = win.add("button", undefined, undefined, { name: "prevB" });
meB.text = "Wyślij do ME";
meB.preferredSize.width = 90;

var prevB = win.add("button", undefined, undefined, { name: "prevB" });
prevB.text = "Tylko prevka";
prevB.preferredSize.width = 90;

var wyB = win.add("button", undefined, undefined, { name: "prevB" });
wyB.text = "Wyczyść";
wyB.color = "white";
wyB.preferredSize.width = 60;

montazB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    comp.saveFrameToPng(comp.time, new File(app.project.file.path + "/" + project_name + ".png"));

    var movie_item1 = render_queue.items.add(comp);
    movie_item1.timeSpanStart = 0;
    movie_item1.timeSpanDuration = comp.duration;
    movie_item1.outputModule(1).applyTemplate("422");
    movie_item1.outputModule(1).file = new File(app.project.file.path + "/" + project_name);

    // Render the items in the render queue
    render_queue.render();
}
studioB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    comp.saveFrameToPng(comp.time, new File(app.project.file.path + "/" + project_name + ".png"));

    var movie_item1 = render_queue.items.add(comp);
    movie_item1.timeSpanStart = 0;
    movie_item1.timeSpanDuration = comp.duration;
    movie_item1.outputModule(1).applyTemplate("DNxHD");
    movie_item1.outputModule(1).file = new File(app.project.file.path + "/" + project_name);

    // Render the items in the render queue
    render_queue.render();
}
obaB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    comp.saveFrameToPng(comp.time, new File(app.project.file.path + "/" + project_name + ".png"));

    var movie_item1 = render_queue.items.add(comp);
    movie_item1.timeSpanStart = 0;
    movie_item1.timeSpanDuration = comp.duration;
    movie_item1.outputModule(1).applyTemplate("422");
    movie_item1.outputModule(1).file = new File(app.project.file.path + "/" + project_name + "_montaz");

    var movie_item2 = render_queue.items.add(comp);
    movie_item2.timeSpanStart = 0;
    movie_item2.timeSpanDuration = comp.duration;
    movie_item2.outputModule(1).applyTemplate("DNxHD");
    movie_item2.outputModule(1).file = new File(app.project.file.path + "/" + project_name + "_studio");

    // Render the items in the render queue
    render_queue.render();

}

meB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    comp.saveFrameToPng(comp.time, new File(app.project.file.path + "/" + project_name + ".png"));

    var movie_item1 = render_queue.items.add(comp);
    movie_item1.timeSpanStart = 0;
    movie_item1.timeSpanDuration = comp.duration;
    movie_item1.outputModule(1).applyTemplate("422");
    movie_item1.outputModule(1).file = new File(app.project.file.path + "/" + project_name);

    // Render the items in the render queue
    if (app.project.renderQueue.canQueueInAME == true) {
        // Send queued items to AME, but do not start rendering.
        app.project.renderQueue.queueInAME(false);
    }
    else {
        alert("Nic nie ma w Render Queue.");
    }

    alert("Ustaw parametry w Me")

}


prevB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    comp.saveFrameToPng(comp.time, new File(app.project.file.path + "/" + project_name + ".png"));

    alert("Zapisałem "+ project_name + ".png")

}

wyB.onClick = function () {

    var comp = app.project.activeItem;
    var render_queue = app.project.renderQueue;
    var project_name = app.project.file.name.split(".")[0];

    while (render_queue.numItems > 0) {
        render_queue.item(1).remove();
    }
}



showWindow(win);
