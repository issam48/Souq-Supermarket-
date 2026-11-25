Option Explicit

Dim shell, fileSystem, projectFolder, launcherPath, desktopFolder, shortcut
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

projectFolder = fileSystem.GetParentFolderName(WScript.ScriptFullName)
launcherPath = fileSystem.BuildPath(projectFolder, "start-souq.cmd")
If Not fileSystem.FileExists(launcherPath) Then
  MsgBox "The Souq launcher was not found in this folder.", vbCritical, "Souq"
  WScript.Quit 1
End If

desktopFolder = shell.SpecialFolders("Desktop")
Set shortcut = shell.CreateShortcut(fileSystem.BuildPath(desktopFolder, "Souq Supermarket.lnk"))
shortcut.TargetPath = launcherPath
shortcut.WorkingDirectory = projectFolder
shortcut.Description = "Start the Souq supermarket management app"
shortcut.Save

MsgBox "Souq shortcut created on the desktop.", vbInformation, "Souq"
