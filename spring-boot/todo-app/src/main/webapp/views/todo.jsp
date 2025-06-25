<%@ include file="common/header.jspf" %>
<%@ include file="common/navigation.jspf" %>

<div class="container">

    <h1>Enter Todos Details:</h1>
    <form:form method="post" modelAttribute="todo">
        <fieldset class="mb-3 mt-3">
            <div class="input-group input-group-sm mb-3">
                <form:label path="description" class="input-group-text">Description:</form:label>
                <form:input type="text" path="description" required="required" cssClass="form-control"/>
            </div>
            <form:errors path="description" cssClass="text-danger"/>
        </fieldset>

        <fieldset class="mb-3">
            <div class="input-group input-group-sm mb-3">
                <form:label path="targetDate" class="input-group-text">Target Date:</form:label>
                <form:input type="text" path="targetDate" required="required" cssClass="form-control"/>
            </div>
            <form:errors path="targetDate" cssClass="text-danger"/>
        </fieldset>

        <form:input type="hidden" path="done" />
        <form:input type="hidden" path="id" />
        <button type="submit" class="btn btn-success">Confirm</button>
    </form:form>

</div>

<%@ include file="common/footer.jspf" %>

<script type="text/javascript">
$('#targetDate').datepicker({
    format: 'yyyy-mm-dd'
});
</script>